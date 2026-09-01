# Relux Transport OÜ — veebileht

Staatiline kaheleheline sait. Ei vaja andmebaasi, buildi ega serveripoolset koodi —
piisab failide üleslaadimisest suvalisse veebimajutusse.

## Failid

```
site/
├── index.html        # avaleht (hero, teenused, miks meie, tagasiside, päringuvorm)
├── galerii.html      # galerii + klientide tagasiside + CTA
├── favicon.svg
├── assets/
│   ├── css/style.css # kogu kujundus
│   ├── css/fonts.css # @font-face definitsioonid
│   ├── fonts/        # Inter + Playfair Display (self-hosted, OFL litsents)
│   └── js/main.js    # aastanumber, päringuvorm, pildivaade
└── img/
    ├── *.jpg         # veebi jaoks optimeeritud pildid (-sm = pisipilt)
    └── orig/         # Facebookist võetud originaalid (ei ole saidil kasutusel)
```

## Kohalik vaatamine

Ava `index.html` otse brauseris või käivita kohalik server:

```bash
cd site && python3 -m http.server 8000
```

## Päringuvorm

Vorm ei saada kirja ise — vajutades „Saada päring" koostab brauser eeltäidetud
kirja aadressile `reluxtransport.info@gmail.com` ja avab külastaja e-posti
rakenduse. Külastaja peab veel ise „Saada" vajutama. Kui rakendus ei avane,
näidatakse aadressi ja nuppu teksti kopeerimiseks.

Kui soovid, et kiri saadetaks automaatselt (ilma külastaja e-posti rakenduseta),
saab vormi ühendada tasuta teenusega nagu [Formspree](https://formspree.io) või
[Web3Forms](https://web3forms.com): asenda `<form id="paringForm" novalidate>`
reaga `<form action="https://formspree.io/f/SINU_ID" method="POST">` ja eemalda
`assets/js/main.js`-ist vormi osa.

## Piltide lisamine

1. Pane pilt kausta `img/`.
2. Tee pisipilt: `sips -Z 640 -s formatOptions 55 --out img/nimi-sm.jpg img/nimi.jpg`
3. Lisa `galerii.html`-i uus `<button class="gal__item" …>` plokk olemasoleva eeskujul.

## Sisu allikad

Tekst pärineb ettevõtte hange.ee profiililt, pildid ja logo Facebooki lehelt
<https://www.facebook.com/p/Relux-Transport-61576911067911/>.
Tagasiside tsitaadid on võetud sama lehe arvustuste ekraanitõmmistelt.

## Kontakt saidil

- Erki Pedak, juhatuse liige — +372 5851 2124
- reluxtransport.info@gmail.com
- Elva, Tartumaa · RELUX TRANSPORT OÜ, reg 17227104
