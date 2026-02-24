import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Helmet } from 'react-helmet-async';

const Personvern = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Personvern – Naturfolk</title>
        <meta name="description" content="Personvernerklæring for trossamfunnet Naturfolk. Les om hvordan vi behandler dine personopplysninger." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">Personvernerklæring</h1>
          <div className="w-24 h-1 bg-primary mb-8"></div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Trossamfunnet Naturfolk tar personvern på alvor. Denne erklæringen beskriver hvordan vi samler inn, bruker og beskytter dine personopplysninger i samsvar med personopplysningsloven og EUs personvernforordning (GDPR).
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Behandlingsansvarlig</h2>
            <p>
              Trossamfunnet Naturfolk er behandlingsansvarlig for personopplysninger som samles inn gjennom våre nettsider og tjenester. Ved spørsmål om personvern kan du kontakte oss på <a href="mailto:post@naturfolk.no" className="text-nature-green hover:underline">post@naturfolk.no</a>.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Hvilke opplysninger samler vi inn?</h2>
            <p>Vi kan samle inn følgende personopplysninger:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Medlemsinformasjon:</strong> Navn, e-postadresse, telefonnummer, adresse, fødselsnummer (for registrering i trossamfunnsregisteret) og eventuell tilleggsinformasjon du oppgir ved innmelding.</li>
              <li><strong>Kontaktinformasjon:</strong> Navn og e-postadresse når du kontakter oss gjennom kontaktskjema eller e-post.</li>
              <li><strong>Nyhetsbrev:</strong> E-postadresse dersom du melder deg på vårt nyhetsbrev.</li>
              <li><strong>Betalingsinformasjon:</strong> Opplysninger knyttet til medlemskontingent og betalinger.</li>
              <li><strong>Teknisk informasjon:</strong> Anonymisert bruksdata som hjelper oss å forbedre nettsidene våre.</li>
            </ul>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Formål med behandlingen</h2>
            <p>Vi behandler personopplysninger for å:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Administrere medlemskap i trossamfunnet, inkludert registrering i offentlige registre i henhold til trossamfunnsloven.</li>
              <li>Sende relevant informasjon om arrangementer, aktiviteter og nyheter.</li>
              <li>Behandle medlemskontingent og betalinger.</li>
              <li>Besvare henvendelser og gi støtte.</li>
              <li>Forbedre våre tjenester og nettsider.</li>
            </ul>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Rettslig grunnlag</h2>
            <p>
              Behandlingen av personopplysninger skjer på grunnlag av samtykke (ved innmelding og påmelding til nyhetsbrev), avtale (medlemskap), rettslig forpliktelse (trossamfunnsloven) og berettiget interesse (forbedring av tjenester).
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Deling av opplysninger</h2>
            <p>
              Vi deler ikke dine personopplysninger med tredjeparter, med unntak av det som kreves ved registrering i trossamfunnsregisteret hos Statsforvalteren, samt nødvendige tjenesteleverandører for drift av våre digitale tjenester (databehandlere). Alle databehandlere er underlagt databehandleravtaler.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Lagring og sletting</h2>
            <p>
              Personopplysninger lagres så lenge det er nødvendig for formålet de ble samlet inn for. Ved utmelding fra trossamfunnet slettes dine opplysninger, med unntak av det vi er lovpålagt å oppbevare.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Dine rettigheter</h2>
            <p>Du har rett til å:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be om innsyn i hvilke opplysninger vi har om deg.</li>
              <li>Kreve retting av uriktige opplysninger.</li>
              <li>Kreve sletting av opplysninger (med forbehold om lovpålagte krav).</li>
              <li>Trekke tilbake samtykke til behandling.</li>
              <li>Klage til Datatilsynet dersom du mener behandlingen er i strid med regelverket.</li>
            </ul>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Informasjonskapsler</h2>
            <p>
              Våre nettsider bruker nødvendige informasjonskapsler for å sikre funksjonalitet. Vi bruker ikke sporingskapsler eller tredjeparts analyseverktøy som samler inn personopplysninger.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Endringer</h2>
            <p>
              Denne personvernerklæringen kan oppdateres ved behov. Siste oppdatering: Februar 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Personvern;
