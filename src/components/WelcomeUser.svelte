<script lang="ts">
    export let webAppData: any;
    const firstName = webAppData.initDataUnsafe.first_name;
    const lastName = webAppData.initDataUnsafe.last_name;
</script>

<h1> Welcome, {firstName} {lastName} </h1>