# GS1 Barcode & Avery / Thermal Label Imposition Specifications (2026)

Open-source die-line geometry, PostScript point (`72 pt/in`) coordinates, quiet-zone rules, and GS1 Modulo-10 check digit reference code from **[UPC Label Maker](https://upclabelmaker.com/)** (`https://upclabelmaker.com`).

When sellers print retail **UPC-A (GTIN-12)**, **EAN-13 (GTIN-13)**, **Amazon FBA FNSKU (Code 128A)**, or **GS1 DataMatrix (ECC 200)** labels on 30-up US Letter sheets or direct thermal rolls, two failures account for over 90% of warehouse scan rejections:

1. **Browser "Fit to Page" (~94% scale drift)**: Chrome and macOS Preview shrink the PDF by ~5–6% when `Fit to Printable Area` is left enabled, causing row 10 on a 30-up sheet to creep `4.2 mm` upward across the die-cut perforation.
2. **Clipped Quiet Zones on 2 × 1 in Thermal Rolls**: Printing a 100% nominal UPC-A (`37.29 mm` wide including 9× left/right quiet zones) onto a `50.8 mm` (`2 in`) label without locking module width (`0.330 mm` at 100%, `0.264 mm` at 80%) clips the outer guard bars on 203 DPI Zebra / Rollo printheads.

---

## Interactive Tools & Calibrated PDF Generators (`upclabelmaker.com`)

Every tool below runs client-side for single-SKU vector PDF / SVG / 600 DPI PNG output and generates multi-SKU imposed press sheets at `1:1` physical scale:

| Tool / Template | Target Standard & Die-Line | Direct Link |
| :--- | :--- | :--- |
| **UPC-A Label Generator** | GS1 GTIN-12 (`0.330 mm` X-dimension, 80% / 100% / 120% magnification, 9× quiet zones) | **[upclabelmaker.com/upc-label-generator](https://upclabelmaker.com/upc-label-generator)** |
| **Amazon FNSKU Label Maker** | Amazon FBA `X00` / `B0` Code 128 Subset A + required Title & Condition (`New`) | **[upclabelmaker.com/amazon-fnsku-label-maker](https://upclabelmaker.com/amazon-fnsku-label-maker)** |
| **EAN-13 Label Generator** | International retail GTIN-13 (`11×` left / `7×` right quiet zones) | **[upclabelmaker.com/ean-13-label-generator](https://upclabelmaker.com/ean-13-label-generator)** |
| **GS1 DataMatrix Generator** | 2D ECC 200 matrix encoding `(01)` GTIN-14, `(17)` Expiry `YYMMDD`, and `(10)` Batch/Lot | **[upclabelmaker.com/gs1-datamatrix-generator](https://upclabelmaker.com/gs1-datamatrix-generator)** |
| **2 × 1 in Thermal Roll Labels** | 1-up continuous roll (`50.8 × 25.4 mm`) for Rollo, Zebra ZD410/ZD421/LP2824, DYMO | **[upclabelmaker.com/thermal-2x1-labels](https://upclabelmaker.com/thermal-2x1-labels)** |
| **GS1 Check Digit Calculator** | Modulo-10 (`3× / 1×` alternating weights) step-by-step verifier for GTIN-8/12/13/14 & SSCC-18 | **[upclabelmaker.com/check-digit-calculator](https://upclabelmaker.com/check-digit-calculator)** |
| **Avery 5160 / 8160 Template** | 30-up US Letter (`2.625 × 1 in`, 3 cols × 10 rows) Blank PDF, Alignment Test PDF & `.docx` | **[upclabelmaker.com/avery-5160-template](https://upclabelmaker.com/avery-5160-template)** |
| **Avery 5163 / 8163 Template** | 10-up US Letter (`4 × 2 in`, 2 cols × 5 rows) Shipping & Box Barcode Template | **[upclabelmaker.com/avery-5163-template](https://upclabelmaker.com/avery-5163-template)** |

---

## 1. Exact Sheet & Roll Imposition Geometry (`label-stock-specs.json`)

All measurements are specified in inches, millimeters (`1 in = 25.4 mm`), and PostScript points (`1 in = 72 pt`):

| Stock ID | Format | Page Size (`pt`) | Grid | Label Size (`in` / `mm`) | Margins (`Top / Left in`) | Pitch (`H × V in`) | Free Blank & Alignment PDFs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`avery_5160`** | Avery 5160 / 8160 (Laser & Inkjet) | `612 × 792 pt` (`8.5 × 11 in`) | `3 × 10` (30/sheet) | `2.625 × 1.0 in` (`66.68 × 25.40 mm`) | `0.50 in` / `0.1875 in` (`36 pt` / `13.5 pt`) | `2.75 × 1.00 in` (`0.125 in` H-gap) | [Avery 5160 Template](https://upclabelmaker.com/avery-5160-template) · [Blank PDF](https://upclabelmaker.com/api/templates/download?stock=avery_5160&kind=blank-pdf) · [Alignment Test PDF](https://upclabelmaker.com/api/templates/download?stock=avery_5160&kind=test-pdf) · [Word `.docx`](https://upclabelmaker.com/api/templates/download?stock=avery_5160&kind=docx) |
| **`avery_5163`** | Avery 5163 / 8163 Shipping | `612 × 792 pt` (`8.5 × 11 in`) | `2 × 5` (10/sheet) | `4.000 × 2.0 in` (`101.60 × 50.80 mm`) | `0.50 in` / `0.15625 in` (`36 pt` / `11.25 pt`) | `4.1875 × 2.00 in` (`0.1875 in` H-gap) | [Avery 5163 Template](https://upclabelmaker.com/avery-5163-template) · [Blank PDF](https://upclabelmaker.com/api/templates/download?stock=avery_5163&kind=blank-pdf) · [Alignment Test PDF](https://upclabelmaker.com/api/templates/download?stock=avery_5163&kind=test-pdf) · [Word `.docx`](https://upclabelmaker.com/api/templates/download?stock=avery_5163&kind=docx) |
| **`thermal_2x1`** | 2 × 1 in Direct Thermal Roll | `144 × 72 pt` (`2.0 × 1.0 in`) | `1 × 1` (1/page) | `2.000 × 1.0 in` (`50.80 × 25.40 mm`) | `0.00 in` / `0.00 in` (`0 pt`) | `2.00 × 1.00 in` | [2×1 Thermal Tool](https://upclabelmaker.com/thermal-2x1-labels) · [Blank PDF](https://upclabelmaker.com/api/templates/download?stock=thermal_2x1&kind=blank-pdf) · [Alignment Test PDF](https://upclabelmaker.com/api/templates/download?stock=thermal_2x1&kind=test-pdf) |
| **`carton_4x6`** | 4 × 6 in Master Carton Roll | `288 × 432 pt` (`4.0 × 6.0 in`) | `1 × 1` (1/page) | `4.000 × 6.0 in` (`101.60 × 152.40 mm`) | `0.00 in` / `0.00 in` (`0 pt`) | `4.00 × 6.00 in` | [Master Carton Generator](https://upclabelmaker.com/upc-label-generator) |

> **Why Avery 5160 and Avery 8160 share identical geometry:** Both stocks use the exact same `2.625 × 1 in` (`66.675 × 25.4 mm`) die-cut layout on `8.5 × 11 in` US Letter sheets (`0.5 in` top/bottom margins, `0.1875 in` left/right margins, `0.125 in` horizontal gutter). The only physical difference is the paper coating (`5160` is optimized for laser toner fusion; `8160` is coated for inkjet ink drying).

---

## 2. GS1 Symbology & Quiet-Zone Specifications

| Symbology | Payload Format | Nominal Module Width (`X`) | Quiet Zone (Left / Right) | Allowed Magnification | Spec Guide & Verification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UPC-A (GTIN-12)** | 11 data digits + 1 Mod-10 check digit | `0.330 mm` (`13 mil`) at 100% | `9×` (`2.97 mm`) / `9×` (`2.97 mm`) | `80%` (`0.264 mm`) – `200%` (`0.660 mm`) | [UPC-A vs EAN-13 vs GTIN-14 Guide](https://upclabelmaker.com/guides/upc-a-vs-ean-13-vs-gtin-14) |
| **EAN-13 (GTIN-13)** | 12 data digits + 1 Mod-10 check digit | `0.330 mm` (`13 mil`) at 100% | `11×` (`3.63 mm`) / `7×` (`2.31 mm`) | `80%` (`0.264 mm`) – `200%` (`0.660 mm`) | [EAN-13 Label Generator](https://upclabelmaker.com/ean-13-label-generator) |
| **Amazon FNSKU (Code 128A)** | 10-char alphanumeric (`X00...` or `B0...`) | `0.330 mm` (`13 mil`) | `0.25 in` (`6.35 mm`) left/right, `0.125 in` (`3.18 mm`) top/bottom | 100% nominal (`300 DPI` / `203 DPI` bar-snapped) | [Amazon FBA Barcode Requirements (2026)](https://upclabelmaker.com/guides/amazon-barcode-requirements) |
| **GS1 DataMatrix (ECC 200)** | `FNC1` + `(01)` GTIN-14 + `(17)` `YYMMDD` + `(10)` Lot | `0.380 mm` – `0.495 mm` | `1×` module width on all 4 sides | Square matrix (`16×16` to `26×26` modules) | [GS1 DataMatrix Generator](https://upclabelmaker.com/gs1-datamatrix-generator) |

---

## 3. Printing Guides & Calibration Reference (`/guides`)

- **[Amazon FBA Barcode Requirements (2026): FNSKU vs. UPC Dimensions, Quiet Zones & Label Sizes](https://upclabelmaker.com/guides/amazon-barcode-requirements)** — covers when Amazon accepts manufacturer UPC/EAN stickers vs. mandatory `X00` FNSKU labels, required text fields, and 30-up vs. thermal roll specs.
- **[How to Print Avery 5160 Barcode Labels Without Vertical Drift or Scaling Errors](https://upclabelmaker.com/guides/how-to-print-avery-5160-labels)** — explains why browser print dialogs shift row 10 by `4.2 mm` and how to verify `100% Actual Size` with a 1-page crosshair alignment sheet.
- **[UPC-A vs. EAN-13 vs. GTIN-14: Which GS1 Barcode Format Do You Actually Need?](https://upclabelmaker.com/guides/upc-a-vs-ean-13-vs-gtin-14)** — compares 12-digit North American retail UPC-A, 13-digit international EAN-13, and 14-digit master carton GTIN-14 / GS1 DataMatrix.

---

## 4. GS1 Modulo-10 Check Digit Reference (`gs1-mod10.mjs`)

```js
import { computeGs1CheckDigit, verifyGtin } from "./gs1-mod10.mjs";

console.log(computeGs1CheckDigit("03600029145")); // => 2 (full UPC-A: 036000291452)
console.log(verifyGtin("4006381333931"));         // => { valid: true, expected: 1, actual: 1, normalized: "4006381333931" }
```

Try the interactive breakdown online at **[upclabelmaker.com/check-digit-calculator](https://upclabelmaker.com/check-digit-calculator)**.

---

## Machine-Readable Documentation

- **LLM Summary (`llms.txt`)**: [`https://upclabelmaker.com/llms.txt`](https://upclabelmaker.com/llms.txt)
- **XML Sitemap (`sitemap.xml`)**: [`https://upclabelmaker.com/sitemap.xml`](https://upclabelmaker.com/sitemap.xml)

## License

Data files (`label-stock-specs.json`) and reference code (`gs1-mod10.mjs`) are released under **MIT / CC BY 4.0**. Attribution to **[UPC Label Maker](https://upclabelmaker.com)** is appreciated.
