<script lang="ts">
    import '../../app.css';
    import BottomNavBar from '../../components/BottomNavBar.svelte';
    import UserInfo from '../../components/UserInfo.svelte';
</script>

<BottomNavBar activeIndex={0}>
    <UserInfo /> 
</BottomNavBar>