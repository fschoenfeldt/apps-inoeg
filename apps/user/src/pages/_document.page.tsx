import NextDocument, { Head, Html, Main, NextScript } from "next/document";

/*
 * Note on CSP: we are blocking everything and allow only the bits we need from "self"
 */
class Document extends NextDocument {
  protected csp =
    process.env.NODE_ENV === "development"
      ? `default-src 'self'; connect-src 'self' ${process.env.NEXT_PUBLIC_STORAGE_ENDPOINT} ${process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT}; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; script-src 'unsafe-eval' 'self'`
      : `default-src 'none'; style-src 'self'; manifest-src 'self'; connect-src 'self' ${process.env.NEXT_PUBLIC_STORAGE_ENDPOINT} ${process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT}; script-src 'self'; font-src 'self'; img-src 'self' data:; prefetch-src 'self'`;

  render() {
    return (
      <Html dir="ltr">
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={this.csp} />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
