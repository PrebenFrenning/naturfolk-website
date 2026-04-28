import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Facebook } from "lucide-react";

export default function TakkForRegistrering() {
  const [searchParams] = useSearchParams();
  const membershipType = searchParams.get("type") || "medlem";

  // Clear stored signup data once payment is complete
  useEffect(() => {
    try {
      localStorage.removeItem("membershipFormData");
      sessionStorage.removeItem("membershipData");
    } catch {}
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Takk for din registrering – Naturfolk</title>
        <meta name="description" content="Takk for din registrering som medlem i Naturfolk." />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card border rounded-lg p-8 md:p-12 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Takk for din registrering som {membershipType}
            </h1>

            <p className="text-muted-foreground text-lg mb-8">
              Vi er glade for å ha deg med i Naturfolk. Du vil motta en bekreftelse på e-post.
            </p>

            <div className="border-t pt-8">
              <p className="mb-6 text-base">
                Du kan nå melde deg inn i vår medlemsgruppe på Facebook:
              </p>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href="https://www.facebook.com/groups/7307299689366349"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Gå til Facebook-gruppen
                </a>
              </Button>
            </div>

            <div className="mt-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary underline">
                Tilbake til forsiden
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
