import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Helmet } from 'react-helmet-async';

const Vilkar = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Vilkår – Naturfolk</title>
        <meta name="description" content="Vilkår for medlemskap og bruk av tjenester i trossamfunnet Naturfolk." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">Vilkår</h1>
          <div className="w-24 h-1 bg-primary mb-8"></div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Om Naturfolk som livssyn</h2>
            <p>
              Naturfolk er et registrert trossamfunn i Norge som bygger på et naturnært livssyn. Vårt livssyn har sin grunn i en dyp ærefrykt for naturen og en forståelse av at mennesket er en uatskillelig del av den levende verden. Vi ser naturen som hellig – ikke som en ressurs, men som et fellesskap vi tilhører og har ansvar for.
            </p>
            <p>
              Som livssyn forener vi fortidens naturåndelighet med samtidens behov for tilhørighet, mening og bærekraft. Våre ritualer, seremonier og samlinger er forankret i naturens sykluser og i det nordiske landskapet vi lever i.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Medlemskap</h2>
            <p>
              Medlemskap i Naturfolk er åpent for alle som deler vårt naturnære livssyn og ønsker å være en del av fellesskapet. Ved innmelding bekrefter du at du:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deler Naturfolks grunnleggende verdier om naturen som hellig og levende.</li>
              <li>Samtykker til registrering i trossamfunnsregisteret hos Statsforvalteren, i henhold til trossamfunnsloven.</li>
              <li>Er innforstått med at medlemskapet innebærer en årlig medlemskontingent.</li>
              <li>Ikke er registrert som medlem i Den norske kirke eller et annet tros- eller livssynssamfunn som mottar offentlig støtte for deg.</li>
            </ul>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Medlemskontingent</h2>
            <p>
              Medlemskontingenten fastsettes årlig og brukes til drift av trossamfunnet, inkludert arrangementer, fellesskapsaktiviteter og utvikling av vårt livssynsarbeid. Informasjon om gjeldende satser finnes på vår medlemskapsside.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Utmelding</h2>
            <p>
              Du kan når som helst melde deg ut av Naturfolk ved å kontakte oss på <a href="mailto:post@naturfolk.no" className="text-nature-green hover:underline">post@naturfolk.no</a>. Ved utmelding vil du bli fjernet fra trossamfunnsregisteret og dine personopplysninger slettes i henhold til vår personvernerklæring.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Fellesskapets verdier</h2>
            <p>
              Som medlem forventes det at du behandler andre medlemmer og deltakere med respekt og åpenhet. Naturfolk er et inkluderende fellesskap der alle er velkomne uavhengig av bakgrunn. Vi forventer at alle bidrar til et trygt og respektfullt miljø på våre arrangementer og i våre digitale kanaler.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Bruk av nettsider</h2>
            <p>
              Innholdet på naturfolk.no er beskyttet av opphavsrett og tilhører Trossamfunnet Naturfolk. Du kan dele og referere til innhold med korrekt kildehenvisning, men kopiering eller kommersiell bruk uten tillatelse er ikke tillatt.
            </p>

            <h2 className="text-xl font-serif font-semibold text-foreground mt-10">Endringer i vilkår</h2>
            <p>
              Vi forbeholder oss retten til å oppdatere disse vilkårene. Vesentlige endringer vil bli kommunisert til våre medlemmer. Siste oppdatering: Februar 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Vilkar;
