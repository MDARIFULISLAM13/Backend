const backendURL = "http://localhost:5000/api/auth";

document.addEventListener( "DOMContentLoaded", () =>
{
    const loginForm = document.getElementById( "loginForm" );
    const signupForm = document.getElementById( "signupForm" );

    // ✅ LOGIN
    if ( loginForm )
    {
        loginForm.addEventListener( "submit", async ( e ) =>
        {
            e.preventDefault();

            const username = document.getElementById( "username" ).value;
            const password = document.getElementById( "password" ).value;

            try
            {
                const res = await fetch( `${backendURL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify( { username, password } )
                } );

                const data = await res.json();

                if ( res.ok )
                {
                    // Token store and redirect
                    localStorage.setItem( "token", data.token );

                    const username = document.getElementById( "username" ).value;
                    window.location.href = `dashboard.html?user=${encodeURIComponent( username )}`;
                } else
                {
                    alert( data.message || "Login failed" );
                }



            } catch ( err )
            {
                console.error( "Login Error:", err );
                alert( "Something went wrong during login." );
            }
        } );
    }

    // ✅ SIGNUP
    if ( signupForm )
    {
        signupForm.addEventListener( "submit", async ( e ) =>
        {
            e.preventDefault();

            const username = document.getElementById( "newUsername" ).value;
            const password = document.getElementById( "newPassword" ).value;

            try
            {
                const res = await fetch( `${backendURL}/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify( { username, password } )
                } );

                const data = await res.json();

                if ( res.ok )
                {
                    alert( "Signup successful! Now login." );
                    window.location.href = "index.html";
                } else
                {
                    alert( data.message || "Signup failed" );
                }
            } catch ( err )
            {
                console.error( "Signup Error:", err );
                alert( "Something went wrong during signup." );
            }
        } );
    }
} );
