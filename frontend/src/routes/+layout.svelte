<script>
  import Header from '$lib/components/Header.svelte'; // <--- CAMBIA ESTO
  import Footer from '$lib/components/Footer.svelte';
  import CartSidebar from '$lib/components/CartSidebar.svelte';
  import '../app.css';
</script>

<div class="app-container">
  <Header /> 
  <main>
    <slot />
  </main>
  <Footer />
</div>

<CartSidebar />

<style>
  /* ... (estilos existentes) ... */
</style>