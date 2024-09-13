<script lang="ts">
  import { onMount } from "svelte";
  import CircularProgressIndicator from "./CircularProgressIndicator.svelte";
  import { userStore } from "../stores/userStore";
  import { Answer, Question } from "../models/Quest";
  import { convertDate } from "../utils/convertDate";
  import ErrorRetry from "./ErrorRetry.svelte";

  // Данные о вопросах и предзаполненные данные анкеты
  let questionsData = <any>[
    new Question(1, "Имя", "text", [], true),
    new Question(2, "Фамилия", "text", [], true),
    new Question(3, "Дата рождения", "date", [], true),
    new Question(
      4,
      "Пол",
      "single",
      [new Answer(1, "Мужской"), new Answer(2, "Женский")],
      true
    ),
    new Question(5, "username", "text", [], false),
  ];
  let userAnswers = <any>[]; // Предзаполненные ответы пользователя
  let isLoading = true;
  let err: any | undefined | null;
  export let onClick: Function;

  onMount(async () => {
    const user = $userStore;
    const answers = questionsData.map((question: any) => {
      return {
        text_question: question.textQuestion,
        answer_type: question.answerType,
        answer: "",
      };
    });
    const today = convertDate(new Date());
    userAnswers = answers;
    userAnswers[0].answer = user.first_name ?? "";
    userAnswers[1].answer = user.last_name ?? "";
    userAnswers[2].answer = today;
    userAnswers[4].answer = user.username ?? "";

    isLoading = false;
  });

  // Функция для отправки данных анкеты
  function submitQuestionnaire() {
    console.log(JSON.stringify({ qa_data: { qa: userAnswers } }));
    onClick(JSON.stringify({ qa_data: { qa: userAnswers } }));
  }
</script>

<div>
  {#if isLoading}
    <div class="loading-indicator">
      <CircularProgressIndicator />
    </div>
  {:else if err != null || undefined}
    <ErrorRetry {err} onRetry={() => {}} errTitle={null} />
  {:else}
    <div class="container">
      {#each questionsData as question, i}
        {#if questionsData[i].isVisible}
          <div class="quest-container">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>{question.textQuestion}</label><br />
            <div class="question-space" />
            {#if question.answerType === "text" || question.answerType === "date"}
              <input
                class="dark secondary-container on-secondary-container"
                type={question.answerType}
                value={userAnswers[i].answer}
                on:input={(e) => {
                  if (
                    e.target instanceof HTMLInputElement &&
                    e.target.value !== null
                  )
                    userAnswers[i].answer = e.target.value;
                }}
              /><br />
            {:else if question.answerType === "single"}
              <div class="radio-container">
                {#each question.answers as answer, j}
                  <label>
                    <input
                      class="dark radio-input"
                      type="radio"
                      name={"question_" + i}
                      value={answer.textAnswer}
                      checked={userAnswers[i].answer === answer.textAnswer}
                      on:change={() =>
                        (userAnswers[i].answer = answer.textAnswer)}
                    />
                    {answer.textAnswer}
                  </label>
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
      <button class="my-button" on:click={submitQuestionnaire}>Отправить</button
      >
    </div>
  {/if}
</div>

<style scoped>
  .loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh; /* Высота индикатора загрузки */
  }
  .quest-container {
    margin: 20px;
    text-align: left;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .question-space {
    margin-top: 8px; /* Добавленный отступ в 8px */
  }

  .secondary-container {
    padding: 5px;
  }

  .on-secondary-container {
    margin-top: 5px;
  }

  .radio-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .radio-input {
    margin-right: 5px;
  }
</style>
