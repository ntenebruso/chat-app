<script context="module">
    export async function preload(page) {
        const { slug } = page.params;
        var res = await this.fetch("/api/rooms/");
        var rooms = await res.json();
        var matchedRoom = await rooms.find(room => room.slug == slug);
        if (!matchedRoom) {
            this.redirect(301, "/");
        }
        return { slug, matchedRoom };
    }
</script>

<script>
    import { onMount, afterUpdate } from "svelte";
    export let slug;
    export let matchedRoom;
    let msgInput;
    let nameInput;
    let msgWrapper;
    let containerElement;
    let socket;
    let nameSelected = false;

    let messages = [];
    let room = slug;

    let id;

    function submitMessage(e) {
        e.preventDefault();
        socket.emit("chat message", room, msgInput.value);
        msgInput.value = null;
        msgInput.focus();
    }

    function submitName(e) {
        e.preventDefault();
        socket.emit("new user", room, nameInput.value.trim());
        nameSelected = true;
    }

    function disconnect() {
        socket.disconnect();
    }

    onMount(() => {
        socket = io();
        socket.on("get user id", userId => id = userId);

        socket.on("chat message", msg => {
            messages = [...messages, msg];
        });

        feather.replace({width: '1em', height: '1em'});
    })

    afterUpdate(() => {
        if (msgWrapper) {
            msgWrapper.scrollTop = msgWrapper.scrollHeight;
        }
    });
</script>

<svelte:head>
    <title>{matchedRoom.name}</title>
</svelte:head>

<div class="container" bind:this={containerElement}>
    <div class="header">
        <a href="/" on:click={disconnect}><span data-feather="arrow-left"></span> Back to home</a>
        <h2>{matchedRoom.name}</h2>
    </div>

    {#if !nameSelected}
    <div class="wrapper names-wrapper">
        <form on:submit={submitName} class="send-name">
            <input placeholder="Name" type="text" bind:this={nameInput}>
            <button class="btn">Enter the room</button>
        </form>
    </div>
    {/if}



    {#if nameSelected}
    <div class="wrapper messages-wrapper" bind:this={msgWrapper}>
        {#each messages as message}
            {#if message.user.id == id}
            <div class="msg-wrapper sent">
                <div class="inner-wrapper">
                    <span class="name">{message.user.name}</span>
                    <div class="message">{message.message}</div>
                </div>
            </div>
            {:else}
            <div class="msg-wrapper">
                <div class="inner-wrapper">
                    <span class="name">{message.user.name}</span>
                    <div class="message">{message.message}</div>
                </div>
            </div>
            {/if}
        {/each}  
    </div>
    <form on:submit={submitMessage} class="send-wrapper">
        <input type="text" bind:this={msgInput}>
        <button type="submit">Send</button>
    </form>
    {/if}
</div>