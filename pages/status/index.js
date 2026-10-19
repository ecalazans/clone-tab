import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <h3>Banco de Dados</h3>
      <StatusDataBase />
    </>
  );
}

function StatusDataBase() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return (
      <>
        <div>Última atualização: Carregando...</div>
        <div>Versão do Banco: Carregando...</div>
        <div>Máximo de conexões permitidas: Carregando...</div>
        <div>Conexões em uso: Carregando...</div>
      </>
    );
  }

  return (
    <>
      <div>
        Última atualização: {new Date(data.updated_at).toLocaleString("pt-BR")}
      </div>
      <div>Versão do Banco: {data.dependencies.database.version}</div>
      <div>
        Máximo de conexões permitidas:{" "}
        {data.dependencies.database.max_connections}
      </div>
      <div>
        Conexões em uso: {data.dependencies.database.opened_connections}
      </div>
    </>
  );
}
