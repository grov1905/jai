const GoogleAnalytics = () => (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-G6ZFT7T80X"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G6ZFT7T80X');
          `,
        }}
      />
    </>
  );
  
  export default GoogleAnalytics;