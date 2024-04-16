<script lang="ts">
	import "../app.css";
</script>

<slot />

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	:global(body) {
		font-family: "Roboto";
	}
</style>
