<?php
/**
 * Plugin Name: Philosophischer Salon — Content Seeder
 * Description: Importiert die statischen Texte der Next.js-Website als WordPress-Seiten und Beiträge, damit sie im WP-Admin bearbeitet werden können. Headless-WP-fähig (REST API).
 * Version: 1.0.0
 * Author: Philosophischer Salon
 * Text Domain: phil-salon-seeder
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Adds admin menu entry for the seeder.
 */
add_action( 'admin_menu', function () {
    add_management_page(
        'Phil-Salon Seeder',
        'Phil-Salon Seeder',
        'manage_options',
        'phil-salon-seeder',
        'phil_salon_seeder_page'
    );
} );

/**
 * Renders the admin page with a "Seed" button.
 */
function phil_salon_seeder_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    $seeded = false;
    $results = [];

    if ( isset( $_POST['phil_salon_seed'] ) && check_admin_referer( 'phil_salon_seed_action' ) ) {
        $results = phil_salon_run_seed();
        $seeded  = true;
    }

    ?>
    <div class="wrap">
        <h1>Philosophischer Salon — Content Seeder</h1>
        <p>Dieses Tool importiert die statischen Texte der Website als WordPress-Seiten und Veranstaltungen (Custom Post Type).</p>
        <p><strong>Hinweis:</strong> Bestehende Seiten mit demselben Slug werden nicht überschrieben.</p>

        <form method="post">
            <?php wp_nonce_field( 'phil_salon_seed_action' ); ?>
            <p>
                <input type="submit" name="phil_salon_seed" class="button button-primary" value="Inhalte importieren" />
            </p>
        </form>

        <?php if ( $seeded ) : ?>
            <h2>Ergebnis</h2>
            <table class="widefat fixed striped">
                <thead>
                    <tr>
                        <th>Typ</th>
                        <th>Titel</th>
                        <th>Slug</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ( $results as $r ) : ?>
                        <tr>
                            <td><?php echo esc_html( $r['type'] ); ?></td>
                            <td><?php echo esc_html( $r['title'] ); ?></td>
                            <td><code><?php echo esc_html( $r['slug'] ); ?></code></td>
                            <td><?php echo esc_html( $r['status'] ); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Register "veranstaltung" custom post type for events.
 */
add_action( 'init', function () {
    register_post_type( 'veranstaltung', [
        'labels'       => [
            'name'          => 'Veranstaltungen',
            'singular_name' => 'Veranstaltung',
        ],
        'public'       => false,
        'show_in_rest' => true,   // Headless WP: expose via REST API
        'show_ui'      => true,
        'menu_icon'    => 'dashicons-calendar-alt',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'has_archive'  => false,
    ] );

    register_post_type( 'neuigkeit', [
        'labels'       => [
            'name'          => 'Neuigkeiten',
            'singular_name' => 'Neuigkeit',
        ],
        'public'       => false,
        'show_in_rest' => true,
        'show_ui'      => true,
        'menu_icon'    => 'dashicons-megaphone',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'has_archive'  => false,
    ] );
} );

/**
 * Runs the actual seeding process.
 */
function phil_salon_run_seed(): array {
    $results = [];

    // ── Pages ──────────────────────────────────────────────
    $pages = [
        [
            'slug'    => 'ueber-uns',
            'title'   => 'Über den Philosophischen Salon',
            'content' => <<<'HTML'
<p>Die fortschreitende Technologisierung durchdringt alle Lebensbereiche. Doch was bedeutet "Technik" eigentlich in ihrem tiefsten Wesen? In Anlehnung an klassische und zeitgenössische Denker widmen wir uns an diesem Abend der Frage, ob Technik lediglich ein neutrales Werkzeug ist oder ob sie unsere Art, in der Welt zu sein, fundamental verändert.</p>
<p>Der Philosophische Salon ist kein Ort der stillen Belehrung, sondern der geteilten Erkenntnis. Wir glauben daran, dass die drängenden Fragen unserer Zeit – sei es die Rolle der Technologie, die Natur des Bewusstseins oder die Konstruktion unserer gesellschaftlichen Wirklichkeit – nicht im luftleeren Raum akademischer Publikationen beantwortet werden können. Sie verlangen nach dem lebendigen, respektvollen und intellektuell rigiden Austausch von Angesicht zu Angesicht.</p>
<blockquote>"Die Sprache ist das Haus des Seins. In ihrer Behausung wohnt der Mensch." – Eine Erinnerung daran, dass unser Sprechen unsere Welt formt.</blockquote>
<p>Unsere Veranstaltungen bringen Menschen unterschiedlichster Disziplinen zusammen. Ob Künstler, Technologen, Akademiker oder neugierige Bürger: Was uns eint, ist der Hunger nach dem Unbequemen, nach dem tieferen Verständnis dessen, was unsere Realität zusammenhält.</p>
HTML,
        ],
        [
            'slug'    => 'verein',
            'title'   => 'Statuten des Vereins',
            'content' => <<<'HTML'
<h3>§ 1: Name, Sitz und Tätigkeitsbereich</h3>
<p>Der Verein führt den Namen "Philosophischer Salon". Er hat seinen Sitz in Wien und erstreckt seine Tätigkeit auf das gesamte Bundesgebiet Österreichs sowie den deutschsprachigen Raum.</p>
<h3>§ 2: Zweck</h3>
<p>Der Verein, dessen Tätigkeit nicht auf Gewinn gerichtet ist, bezweckt die Förderung philosophischer Diskurskultur, der klassischen Geisteswissenschaften sowie der transdisziplinären Auseinandersetzung mit Gegenwartsfragen. Dies geschieht vorrangig durch die Abhaltung moderierter Salons, Vorträge und Lesungen.</p>
<h3>§ 3: Mittel zur Erreichung des Vereinszwecks</h3>
<p>Der Vereinszweck soll durch die in den folgenden Absätzen angeführten ideellen und materiellen Mittel erreicht werden. Als ideelle Mittel dienen Vorlesungen, Seminare, Versammlungen (Salons), Diskussionsabende und die Herausgabe von Publikationen.</p>
<p>Die erforderlichen materiellen Mittel sollen aufgebracht werden durch Beitrittsgebühren, Mitgliedsbeiträge, Erträgnisse aus Veranstaltungen, Spenden, Sammlungen, Vermächtnisse und sonstige Zuwendungen.</p>
HTML,
        ],
        [
            'slug'    => 'impressum',
            'title'   => 'Impressum',
            'content' => <<<'HTML'
<h3>Angaben gemäß § 25 MedienG</h3>
<p>Philosophischer Salon<br/>[Adresse einfügen]<br/>Wien, Österreich</p>
<h3>Vereinsregister</h3>
<p>ZVR-Zahl: [ZVR-Zahl einfügen]</p>
<h3>Kontakt</h3>
<p><a href="/kontakt">Zum Kontaktformular</a></p>
<h3>Verantwortlich für den Inhalt</h3>
<p>[Name des Obmanns / der Obfrau einfügen]<br/>Philosophischer Salon</p>
<h3>Haftungshinweis</h3>
<p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
HTML,
        ],
        [
            'slug'    => 'datenschutz',
            'title'   => 'Datenschutzerklärung',
            'content' => <<<'HTML'
<h3>1. Verantwortlicher</h3>
<p>Philosophischer Salon<br/>[Adresse einfügen]<br/>Wien, Österreich</p>
<h3>2. Erhebung und Verarbeitung personenbezogener Daten</h3>
<p>Wir erheben personenbezogene Daten nur dann, wenn Sie uns diese im Rahmen eines Mitgliedsantrags oder einer Kontaktanfrage freiwillig übermitteln.</p>
<h3>3. Mitgliedsantrag</h3>
<p>Im Rahmen des Mitgliedsantrags erheben wir folgende Daten:</p>
<ul><li>Name</li><li>Telefonnummer</li><li>Adresse (Straße, Hausnummer, PLZ, Ort, Land)</li><li>E-Mail-Adresse</li><li>Bereitschaft zur Teilnahme an der Telegram-Gruppe (optional)</li></ul>
<p>Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie die Vertragsanbahnung (Art. 6 Abs. 1 lit. b DSGVO).</p>
<h3>4. Speicherdauer</h3>
<p>Ihre Daten werden so lange gespeichert, wie es für die Zwecke der Vereinsverwaltung erforderlich ist bzw. gesetzliche Aufbewahrungsfristen bestehen.</p>
<h3>5. Ihre Rechte</h3>
<p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie das Recht auf Datenübertragbarkeit.</p>
HTML,
        ],
        [
            'slug'    => 'spenden',
            'title'   => 'Spenden',
            'content' => <<<'HTML'
<p>Der Philosophische Salon lebt vom Engagement seiner Unterstützer. Mit Ihrer Spende tragen Sie dazu bei, einen Raum für freien Diskurs und tiefgreifende Auseinandersetzung zu erhalten.</p>
<h3>Bankverbindung</h3>
<p>Kontoinhaber: Philosophischer Salon<br/>IBAN: [IBAN einfügen]<br/>BIC: [BIC einfügen]<br/>Verwendungszweck: Spende Philosophischer Salon</p>
HTML,
        ],
    ];

    foreach ( $pages as $page ) {
        $existing = get_page_by_path( $page['slug'], OBJECT, 'page' );
        if ( $existing ) {
            $results[] = [
                'type'   => 'Seite',
                'title'  => $page['title'],
                'slug'   => $page['slug'],
                'status' => 'Bereits vorhanden — übersprungen',
            ];
            continue;
        }

        $id = wp_insert_post( [
            'post_title'   => $page['title'],
            'post_name'    => $page['slug'],
            'post_content' => $page['content'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
        ] );

        $results[] = [
            'type'   => 'Seite',
            'title'  => $page['title'],
            'slug'   => $page['slug'],
            'status' => $id ? "Erstellt (ID: $id)" : 'Fehler',
        ];
    }

    // ── Events (Veranstaltungen) ───────────────────────────
    $events = [
        [
            'slug'    => 'wesen-der-technik',
            'title'   => 'Über das Wesen der Technik',
            'date'    => '2026-11-24',
            'time'    => '19:00',
            'content' => '<p>Die fortschreitende Technologisierung durchdringt alle Lebensbereiche. Doch was bedeutet "Technik" eigentlich in ihrem tiefsten Wesen?</p><p>Wir laden Sie ein zu einem Diskurs über Entbergen, Gestell und die Verantwortung des Menschen im Maschinenzeitalter.</p>',
        ],
        [
            'slug'    => 'ethik-der-ki',
            'title'   => 'Ethik der künstlichen Intelligenz',
            'date'    => '2026-12-05',
            'time'    => '18:30',
            'content' => '<p>Debatte zur Verantwortung und Moral von Algorithmen.</p>',
        ],
    ];

    foreach ( $events as $event ) {
        $existing = get_page_by_path( $event['slug'], OBJECT, 'veranstaltung' );
        if ( $existing ) {
            $results[] = [
                'type'   => 'Veranstaltung',
                'title'  => $event['title'],
                'slug'   => $event['slug'],
                'status' => 'Bereits vorhanden — übersprungen',
            ];
            continue;
        }

        $id = wp_insert_post( [
            'post_title'   => $event['title'],
            'post_name'    => $event['slug'],
            'post_content' => $event['content'],
            'post_status'  => 'publish',
            'post_type'    => 'veranstaltung',
            'meta_input'   => [
                'event_date' => $event['date'],
                'event_time' => $event['time'],
            ],
        ] );

        $results[] = [
            'type'   => 'Veranstaltung',
            'title'  => $event['title'],
            'slug'   => $event['slug'],
            'status' => $id ? "Erstellt (ID: $id)" : 'Fehler',
        ];
    }

    // ── News (Neuigkeiten) ─────────────────────────────────
    $news = [
        [
            'slug'    => 'gruendung',
            'title'   => 'Der Salon öffnet seine Pforten',
            'date'    => '2026-10-15',
            'content' => '<p>Wir freuen uns außerordentlich, die Gründung des Philosophischen Salons bekanntzugeben. In einer Zeit der schnellen Antworten und oberflächlichen Debatten möchten wir einen physischen und intellektuellen Raum schaffen für das, was heute so oft fehlt: Die Tiefe.</p><h2>Was ist ein Salon?</h2><p>Die historische Salonkultur war stets ein Ort der Zusammenkunft unterschiedlichster Geister. Hier trafen sich Literaten, Philosophen, Politiker und Bürger, um frei von Zwängen zu sprechen. Diesen Geist holen wir in die Gegenwart.</p>',
        ],
        [
            'slug'    => 'mitgliedschaft',
            'title'   => 'Aufruf zur Mitgliedschaft',
            'date'    => '2026-11-02',
            'content' => '<p>Unterstützen Sie uns dabei, eine Plattform für tiefgreifende philosophische und gesellschaftliche Themen zu schaffen.</p>',
        ],
        [
            'slug'    => 'planung',
            'title'   => 'Erste Veranstaltungsreihe in Planung',
            'date'    => '2026-12-10',
            'content' => '<p>Das Kuratorium arbeitet intensiv am Programm für das kommende Jahr. Freuen Sie sich auf spannende Vorträge und Debatten.</p>',
        ],
    ];

    foreach ( $news as $item ) {
        $existing = get_page_by_path( $item['slug'], OBJECT, 'neuigkeit' );
        if ( $existing ) {
            $results[] = [
                'type'   => 'Neuigkeit',
                'title'  => $item['title'],
                'slug'   => $item['slug'],
                'status' => 'Bereits vorhanden — übersprungen',
            ];
            continue;
        }

        $id = wp_insert_post( [
            'post_title'   => $item['title'],
            'post_name'    => $item['slug'],
            'post_content' => $item['content'],
            'post_status'  => 'publish',
            'post_type'    => 'neuigkeit',
            'post_date'    => $item['date'] . ' 12:00:00',
        ] );

        $results[] = [
            'type'   => 'Neuigkeit',
            'title'  => $item['title'],
            'slug'   => $item['slug'],
            'status' => $id ? "Erstellt (ID: $id)" : 'Fehler',
        ];
    }

    // ── Site Config (as WP option) ─────────────────────────
    $config = [
        'logoText'     => 'Philosophischer Salon',
        'logoImageUrl' => '/logo.png',
        'heroTitle'    => 'Philosophischer Salon',
        'heroSubtitle' => 'Ein Raum für freien Diskurs, tiefgreifende Gedanken und den Austausch über die drängenden Fragen unserer Zeit.',
        'contactEmail' => 'kontakt@philosophischer-salon.at',
    ];

    update_option( 'phil_salon_config', $config );
    $results[] = [
        'type'   => 'Option',
        'title'  => 'Site-Konfiguration',
        'slug'   => 'phil_salon_config',
        'status' => 'Gespeichert',
    ];

    return $results;
}

/**
 * Expose phil_salon_config via REST API for the headless frontend.
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'phil-salon/v1', '/config', [
        'methods'             => 'GET',
        'callback'            => function () {
            return rest_ensure_response( get_option( 'phil_salon_config', [] ) );
        },
        'permission_callback' => '__return_true',
    ] );
} );
