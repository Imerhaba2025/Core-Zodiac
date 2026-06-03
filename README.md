# Core-Zodiac

A lightweight static demo for a WhatsApp contact widget.

## WhatsApp widget

The widget includes:

- A floating WhatsApp launcher.
- A chat-style support card with availability text.
- Suggested quick replies that populate the message field.
- A direct `wa.me` click-to-chat URL with an encoded prefilled message.
- Responsive styling for desktop and mobile layouts.

## Run locally

```bash
npm run start
```

Then open <http://localhost:4173>.

## Configure

Update `businessPhoneNumber` in `src/main.js` with the WhatsApp Business phone number in international format without `+`, spaces, or dashes.
