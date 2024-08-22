
<script lang="ts">
  import CircularProgressIndicator from './CircularProgressIndicator.svelte';
  import InputForm from './InputForm.svelte';
  import { goto } from '$app/navigation';
  import { fakeRequest } from '../utils/fakeRequest';

  const questions = [
    { id: 1, label: 'Question 1', answer: '' },
    { id: 2, label: 'Question 2', answer: '' },
    { id: 3, label: 'Question 3', answer: '' },
    { id: 4, label: 'Question 4', answer: '' },
    { id: 5, label: 'Question 5', answer: '' },
    { id: 6, label: 'Question 6', answer: '' },
    { id: 7, label: 'Question 7', answer: '' },
    { id: 8, label: 'Question 8', answer: '' },
    { id: 9, label: 'Question 9', answer: '' }
  ];

  let isLoading = false;
  let currentStep = 0;

 

  async function nextStep()  {
    if (currentStep < questions.length / 3 - 1) {
      currentStep += 1;
    } else {
      isLoading = true;

      await fakeRequest();

      goto('/quest_complete', {replaceState: true});
    }
  }

  function prevStep() {
    if (currentStep >= questions.length / 3 - 2) {
      currentStep -= 1;
    }
  }
</script>

<style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  
  .input-group {
    margin: 10px 0;
  }

  .navigation {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .dot {
    height: 10px;
    width: 40px;
    margin: 0 5px;
    border-radius: 12px;
  }

  .controll-button {
        width: 120px;
        height: 36px;
    }

  .surface-container:hover {
    background-color: var(--md-sys-color-surface-container-high);
  } 

</style>

{#if !isLoading}
  <div class="form-container">
    {#each Array(3) as _, stepIndex}
      <div>
        {#each questions.slice(currentStep * 3 + stepIndex, currentStep * 3 + stepIndex + 1) as question, index}
          <div class="input-group">
            <!-- svelte-ignore a11y-label-has-associated-control -->
           <InputForm label={question.label} bind:value={question.answer}/>
          </div>
        {/each}
      </div>
    {/each}
  
    <div class="navigation">
      {#each Array(3) as _, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="dark dot tertiary {currentStep === index ? 'tertiary-container' : ''}" on:click={() => {currentStep = index}}></div>
      {/each}
    </div>
  
    <div>
      <button on:click={prevStep} class='dark my-button controll-button {currentStep == 0 ? 'surface-container on-surface-variant' : ''}' disabled={currentStep == 0}>
        Back
      </button>   
      <button on:click={nextStep} class='my-button controll-button'>
        {currentStep < questions.length / 3 - 1 ? 'Next' : 'Send'}
      </button>   
    </div>
  </div>
{:else}
  <CircularProgressIndicator />  
{/if}