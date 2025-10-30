# GitHub Setup - Personal Access Token

## Βήματα για Push στο GitHub:

### 1. Δημιούργησε Personal Access Token

1. Πήγαινε στο: https://github.com/settings/tokens
2. Κλικ: **Generate new token** → **Generate new token (classic)**
3. Όνομα: `Headless WP Deploy`
4. Scopes: Επίλεξε τουλάχιστον:
   - ✅ `repo` (Full control of private repositories)
5. Κλικ: **Generate token**
6. **ΑΝΤΙΓΡΑΨΕ ΤΟ TOKEN** (θα το δεις μόνο μια φορά!)

### 2. Push με Token

Στο terminal:

```bash
cd C:\Users\egwox\Desktop\headless-wordpress-test

# Άλλαξε το remote URL
git remote set-url origin https://YOUR_TOKEN@github.com/SymbolsAgency/symbols-headless-wp.git

# Push
git push -u origin main
```

**ΑΝΤΙΚΑΤΕΣΤΗΣΕ** `YOUR_TOKEN` με το Personal Access Token που έφτιαξες!

---

## Ή Χρησιμοποίησε GitHub Desktop (Πιο Εύκολο!)

1. Κατέβασε: https://desktop.github.com/
2. Sign in
3. Add Local Repository → Επίλεξε το `headless-wordpress-test`
4. Publish!

---

## Μετά το Push:

Άνοιξε: https://github.com/SymbolsAgency/symbols-headless-wp

Θα δεις όλα τα αρχεία εκεί! 🎉

Μετά συνεχίζουμε με Vercel deploy!
