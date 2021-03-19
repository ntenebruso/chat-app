<script context="module">
    export async function preload(page, { user, loggedIn }) {
        if (loggedIn) {
            return this.redirect(302, '/rooms');
        }
    }
</script>

<svelte:head>
    <title>Chatt</title>
</svelte:head>

<div class="container">
    <div class="header">
        <h2>Login to Chatt</h2>
    </div>
    <div class="wrapper">
        <a class="btn" href="/auth/login">Sign in with Google</a>
        <p>Signing in will give you access to perks such as:</p>
        <ul>
            <li>Custom room settings</li>
            <li>Room ownership</li>
            <li>Room administrator access</li>
        </ul>
        <a href="/rooms" class="btn">Browse as guest</a>
    </div>
</div>