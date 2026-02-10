
# Legg til hero-bilde pa Om oss-siden

## Endring
Erstatte den groenne gradient-hero-seksjonen pa `/about` med det opplastede bildet av folk samlet i en lavvu, i samme stil som andre sider (Kontakt, Kalender, etc.) med bildebakgrunn og mork gradient-overlay.

## Steg

1. **Kopier bildet** til `src/assets/om-oss-hero.jpg`
2. **Oppdater `src/pages/About.tsx`**:
   - Importere bildet som ES6-modul
   - Erstatte gradient-bakgrunnen med et bilde-element med `object-cover`
   - Legge til mork gradient-overlay (som pa Kontakt-siden)
   - Beholde samme hoyde-stil som andre hero-seksjoner (~30-40vh)
   - Beholde tittel og undertekst

### Teknisk detalj
Hero-seksjonen endres fra:
```
<section className="relative py-24 bg-gradient-to-br from-nature-green ...">
```
til et monster likt Kontakt-siden:
```
<section className="relative h-[40vh] min-h-[250px] flex items-center justify-center">
  <img src={omOssHero} ... className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
  ...
</section>
```
