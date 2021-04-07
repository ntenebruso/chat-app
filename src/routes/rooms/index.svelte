<script context="module">
    export async function preload(page, { user, loggedIn }) {
        const res = await this.fetch('/api/rooms/');
        const rooms = await res.json();
        return { rooms, user, loggedIn };
    }
</script>

<script>
    import { onMount } from "svelte";
    export let rooms;
    export let user;
    export let loggedIn;
    let createRoomPopup = false;
    let createRoomForm;
    let roomNameInput;
    let socket;

    function handleClick() {
        createRoomPopup = true;
    }

    onMount(() => {
        feather.replace({width: '1em', height: '1em'});
        console.log(user);
    });
</script>

<svelte:head>
    <title>Chatt</title>
</svelte:head>

<div class="container">
    <div class="header">
        <h2>Select a room</h2>
    </div>
    <div class="wrapper rooms-wrapper">
        <div class="create-wrapper">
            <button on:click={handleClick} class="btn">New Room</button>
            {#if createRoomPopup}
                <form bind:this={createRoomForm} class="create-form" action="/api/createroom/" method="POST">
                    <input name="room" type="text" placeholder="Room name" bind:this={roomNameInput}>
                    <button class="btn" type="submit">Create</button>
                </form>
            {/if}
        </div>
        {#if loggedIn}
        <h4>Signed in as {user.displayName} ({user.emails[0].value})</h4>
        {/if}
        {#each rooms as room}
        <div class="room-display">
            <div>
                <h3>{room.name}</h3>
                <p><span data-feather="user"></span> {room.users.length}</p>
            </div>
            <div>
                <a class="btn" href={`/rooms/${room.slug}`}>Join</a>
            </div>
        </div>
        {/each}
    </div>
</div>
