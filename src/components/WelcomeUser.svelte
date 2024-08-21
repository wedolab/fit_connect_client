<script lang="ts">
    export let webAppData: any;

    const userInfo: any = webAppData?.initDataUnsafe;
    const firstName: String | undefined = userInfo?.first_name ?? 'Undefined';
</script>

<h2> Welcome, {userInfo} </h2>