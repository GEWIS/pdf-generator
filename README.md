# PDF-generator-client

This repository serves as the client for the PDF-generator, which is contained in the `server` subdirectory. The client in this directory is automatically generated using [NSwag](https://github.com/RicoSuter/NSwag).

## Usage

To utilize the client, include the following dependency in your `package.json`.

```json
{
  "dependencies": {
    "@pdf/pdf-generator-client": "github:GEWIS/pdf-generator-client"
  }
}
```

After adding the dependency, import it into your project and instantiate a client to begin generating invoices.

```typescript
import { Client } from '@pdf/pdf-generator-client';

let client =  new Client(process.env.BASE_URL);
client.generateInvoice(...);
```

Ensure that the `BASE_URL` environment variable is set appropriately to point to your PDF-generator-server instance.
