import { getPageData } from "@/lib/wp";
import { sanitizeHtml } from "@/lib/sanitize";

export default async function UeberUnsPage() {
    const data = await getPageData("ueber-uns");

    return (
        <article className="min-h-screen bg-creme relative">
            {/* Hero Section */}
            <div className="w-full h-[50vh] min-h-[400px] relative overflow-hidden border-b-2 border-hofburg-red">
                {data.imageUrl ? (
                    <img
                        src={data.imageUrl}
                        alt="Der Philosophische Salon"
                        className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-dark"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-creme via-creme/50 to-transparent"></div>
            </div>

            <div className="max-w-3xl mx-auto px-6 -mt-32 relative z-10 pb-32">
                <div className="mb-16 text-center">
                    <p className="text-hofburg-red font-sans text-sm tracking-widest uppercase mb-4 font-semibold">
                        Vision & Tradition
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-tight mb-8">
                        {data.title}
                    </h1>
                    <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto my-12"></div>
                </div>

                <div className="
                prose prose-lg prose-gray max-w-none font-sans font-light leading-loose text-gray-800
                prose-p:mb-8
                prose-headings:font-serif prose-headings:text-gray-900 prose-headings:font-normal prose-headings:mt-16 prose-headings:mb-6
                prose-blockquote:border-l-[1px] prose-blockquote:border-hofburg-red prose-blockquote:pl-8 prose-blockquote:my-12 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:text-3xl prose-blockquote:leading-snug
                first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-none
            ">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.content) }} />
                </div>

                <div className="flex justify-center items-center gap-4 mt-24 opacity-60">
                    <div className="w-16 h-[1px] bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold-primary"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-hofburg-red"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold-primary"></div>
                    <div className="w-16 h-[1px] bg-gray-400"></div>
                </div>
            </div>
        </article>
    );
}
