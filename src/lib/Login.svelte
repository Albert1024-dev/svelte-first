<script>
    import { onMount } from "svelte";
    import { getCookie, setCookie } from "../js/cookie.js";
    import { postRequest } from "../js/http.js";
    import { getConfig, getJsonPage, getValue } from "../js/config.js";

    let email = "";
    let password = "";
    let errorMessage = "";

    let config = {};

    let title = "Login";
    let subtitle = "Sign in to your account";

    let url = "NA";
    let directUrl = "/start";
    let cookieName = "login_tokens";

    onMount(async () => {
        //config = await getConfig();
        /*
        const loginPage = getJsonPage(config, 'login');
        document.title = loginPage.title;
        title = loginPage.title ? loginPage.title : title;
        subtitle = loginPage.subtitle ? loginPage.subtitle : subtitle;
        url = loginPage.url ? loginPage.url : url;
        directUrl = loginPage.directUrl ? loginPage.directUrl : directUrl;
        cookieName = loginPage.cookieName ? loginPage.cookieName : cookieName;
        const cookieExists = getCookie(cookieName);
        if (cookieExists) {
            //window.location.href = directUrl;
        }

         */
    });

    async function handleLogin(event) {
        event.preventDefault();
        errorMessage = "";
        const data = { username: email, password: password };

        try {
            const response = await postRequest('login', url, data);
            const result = await response.json();

            if (response.ok) {
                const expiryDays = 21;
                setCookie(cookieName, `${result.token}`, expiryDays);
                window.location.href = directUrl;
            } else {
                errorMessage = result.error;
                setTimeout(() => { errorMessage = ""; }, 20000);
            }
        } catch (err) {
            errorMessage = "An unexpected error occurred. Please try again.";
        }
    }

</script>

<main>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                {subtitle}
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" on:submit={handleLogin}>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" name="email" bind:value={email} type="email" autocomplete="email" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="password" name="password" bind:value={password} type="password" autocomplete="current-password" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign in</button>
                    </div>

                    {#if errorMessage}
                    <div class="rounded-md bg-yellow-50 p-4 sm:px-1">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-yellow-800">Problem logging in</h3>
                                <div class="mt-2 text-sm text-yellow-700">
                                    <p>{errorMessage}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/if}
                </form>
            </div>
        </div>
    </div>
</main>