# Relux Transport OÜ koduleht

Staatiline kaheleheline sait. Ei vaja andmebaasi, buildi ega serveripoolset koodi.
Piisab failide üleslaadimisest suvalisse veebimajutusse.

## Failid

```
.
├── index.html        # avaleht (hero, teenused, miks meie, tagasiside, päringuvorm)
├── galerii.html      # galerii pildivaatega
├── favicon.svg
├── assets/
│   ├── css/style.css # kogu kujundus
│   ├── css/fonts.css # @font-face definitsioonid
│   ├── fonts/        # Inter ja Playfair Display (ise majutatud, OFL litsents)
│   └── js/main.js    # aastanumber, päringuvorm, pildivaade
└── img/
    ├── *.jpg         # veebi jaoks optimeeritud pildid (-sm on pisipilt)
    └── orig/         # Facebookist võetud originaalid (saidil kasutusel ei ole)
```

## Kohalik vaatamine

Ava `index.html` otse brauseris või käivita kohalik server:

```bash
python3 -m http.server 8000
```

## Päringuvorm

Vorm ei saada kirja ise. Kui külastaja vajutab „Saada päring", koostab brauser
eeltäidetud kirja aadressile `reluxtransport.info@gmail.com` ja avab külastaja
e-posti rakenduse, kus tuleb veel „Saada" vajutada. Kui rakendus ei avane,
näidatakse aadressi ja nuppu teksti kopeerimiseks.

Kui soovid, et kiri saadetaks automaatselt ilma külastaja e-posti rakenduseta,
saab vormi ühendada tasuta teenusega nagu [Formspree](https://formspree.io) või
[Web3Forms](https://web3forms.com). Selleks asenda rida
`<form class="form" id="paringForm" novalidate>` reaga
`<form class="form" action="https://formspree.io/f/SINU_ID" method="POST">` ja
eemalda `assets/js/main.js`-ist vormi puudutav osa.

## Piltide lisamine

1. Pane pilt kausta `img/`.
2. Tee pisipilt: `sips -Z 820 -s formatOptions 56 --out img/nimi-sm.jpg img/nimi.jpg`
3. Lisa `galerii.html`-i uus `<button class="gal__item" …>` plokk olemasoleva eeskujul.
   Kirjuta `width` ja `height` atribuutidesse pisipildi tegelikud mõõdud, muidu
   hüppab paigutus laadimise ajal.

## Sisu allikad

Tekst pärineb ettevõtte hange.ee profiililt, pildid ja logo Facebooki lehelt
<https://www.facebook.com/p/Relux-Transport-61576911067911/>.
Tagasiside tsitaadid on võetud sama lehe arvustustest.

## Kontakt saidil

- Erki Pedak, juhatuse liige, +372 5851 2124
- reluxtransport.info@gmail.com
- Elva, Tartumaa. RELUX TRANSPORT OÜ, reg 17227104
