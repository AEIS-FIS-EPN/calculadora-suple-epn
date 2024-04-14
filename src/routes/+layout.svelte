<script lang="ts">
	import "../app.css";
</script>

<!-- <div class="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white"> -->
<!-- <div> -->
<slot />
<!-- </div> -->

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
