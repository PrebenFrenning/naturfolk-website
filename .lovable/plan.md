

# Admin-side for medlemsadministrasjon

## Oversikt

Bygge en ny admin-side under `/admin/members` som gir administratorer full oversikt over alle medlemmer, med soek, filtrering og redigering.

## Hva som lages

### 1. Ny admin-side: `src/pages/admin/Members.tsx`
Folger samme monster som eksisterende admin-sider (Posts, Events, etc.):

- **Medlemstabell** med kolonner: Navn, E-post, Medlemstype, By, Telefon, Registrert dato, Siste innlogging
- **Soekefelt** for filtrering pa navn og e-post (klientsiden filtrering)
- **Dropdown-filter** for medlemstype (Stottemedlem / Hovedmedlem / Utmelding)
- **Redigeringsknapp** per medlem som apner en dialog

### 2. Redigeringsdialog: `src/components/admin/MemberDialog.tsx`
En dialog for a redigere medlemsdetaljer:
- Fornavn, mellomnavn, etternavn
- E-post, telefon
- Adresse, postnummer, by, land
- Medlemstype (dropdown)
- Temagrupper (checkboxes)
- Nyhetsbrev og fellesskap-innstillinger

### 3. Oppdatering av navigasjon
- Legge til "Medlemmer" i sidebar-navigasjonen i `AdminLayout.tsx` med Users-ikon
- Legge til ruten `/admin/members` i `App.tsx` med ProtectedRoute og AdminLayout

### 4. Dashboard-oppdatering
- Legge til medlemsteller-kort pa Dashboard-siden

## Tekniske detaljer

- **Ingen databaseendringer trengs** - profiles-tabellen har allerede RLS-policyer som lar admins lese og oppdatere alle profiler
- Bruker eksisterende `supabase.from('profiles')` for a hente og oppdatere data
- Folger eksisterende UI-monstre med Card, Table, Badge, Dialog-komponenter fra shadcn/ui
- Soek implementeres med `ilike`-filter pa Supabase-sporringen for serversidefiltrering

### Filer som endres/opprettes:
- **Ny:** `src/pages/admin/Members.tsx` - Hovedsiden med tabell og soek
- **Ny:** `src/components/admin/MemberDialog.tsx` - Redigeringsdialog
- **Endres:** `src/components/AdminLayout.tsx` - Legge til navigasjonslenke
- **Endres:** `src/App.tsx` - Legge til rute
- **Endres:** `src/pages/admin/Dashboard.tsx` - Legge til medlemsteller

