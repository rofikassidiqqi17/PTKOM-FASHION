const fs = require('fs');
let style = fs.readFileSync('legacy_vanilla/style.css', 'utf-8');
let gallery = fs.readFileSync('legacy_vanilla/gallery.css', 'utf-8');
let account = fs.readFileSync('legacy_vanilla/account.css', 'utf-8');

gallery = gallery.replace(/body\s*\{[^}]+\}/g, '').replace(/body::before\s*\{[^}]+\}/g, '');
account = account.replace(/body\s*\{[^}]+\}/g, '').replace(/body::before\s*\{[^}]+\}/g, '');

fs.writeFileSync('src/app/globals.css', style + '\n' + gallery + '\n' + account);
