async function shortenUrl()
{
    const longUrl = document.getElementById( "longUrl" ).value;
    const customPath = document.getElementById( "customPath" ).value;

    if ( !longUrl )
    {
        alert( "Please enter a URL." );
        return;
    }

    try
    {
        // const response = await fetch( "http://localhost:8000/api/web/user_url", {
        const response = await fetch( " https://new-url.onrender.com/api/web/user_url", {


            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {
                user_url: longUrl,
                user_name: customPath
            } )
        } );

        const data = await response.json();
        console.log( "Server response:", data );

        if ( data.shortUrl )
        {
            document.getElementById( "shortUrl" ).textContent = data.shortUrl;
            document.getElementById( "shortUrl" ).href = data.shortUrl;
            document.getElementById( "result" ).classList.remove( "hidden" );
        } else
        {
            alert( "Error: " + ( data.message || "Could not shorten URL." ) );
        }
    } catch ( err )
    {
        console.error( "Fetch error:", err );
        alert( "Error contacting server." );
    }
}

function copyUrl()
{
    const url = document.getElementById( "shortUrl" ).textContent;
    navigator.clipboard.writeText( url ).then( () =>
    {
        alert( "✅ URL copied to clipboard!" );
    } );
}
