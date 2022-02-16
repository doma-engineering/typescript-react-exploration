defmodule MVReact.MixProject do
  use Mix.Project

  def project do
    [
      app: :m_v_react,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {MVReact.Otp.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:arclight, path: "../arclight"},
      {:arclight, "~> 0.3.0-pre"},
      {:dyn_hacks, "~> 0.1.0"},
      {:doma, "~> 1.0.0"}
    ]
  end
end
