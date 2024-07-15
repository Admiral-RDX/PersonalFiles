defmodule ICalendarWeb.UserForgotPasswordLive do
  use ICalendarWeb, :live_view

  alias ICalendar.Accounts

  def render(assigns) do
    ~H"""
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <.simple_form for={@form} id="reset_password_form" phx-submit="send_email">
              <.input field={@form[:email]} type="email" placeholder="Email" required />
              <.button phx-disable-with="Sending..." class="w-full">
                Send password reset instructions
              </.button>
            </.simple_form>
            <p class="text-slate-800 dark:text-white hover:underline">
              <.link href={~p"/users/log_in"} class="text-sm font-medium">Log in</.link>
            </p>
          </div>
        </div>
      </div>
    </section>
    """
  end

  def mount(_params, _session, socket) do
    {:ok, assign(socket, form: to_form(%{}, as: "user"))}
  end

  def handle_event("send_email", %{"user" => %{"email" => email}}, socket) do
    if user = Accounts.get_user_by_email(email) do
      Accounts.deliver_user_reset_password_instructions(
        user,
        &url(~p"/users/reset_password/#{&1}")
      )
    end

    info =
      "If your email is in our system, you will receive instructions to reset your password shortly."

    {:noreply,
     socket
     |> put_flash(:info, info)
     |> redirect(to: ~p"/")}
  end
end
