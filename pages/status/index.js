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
      <UpdatedAt />
      <VersionDataBase />
      <MaxConnections />
      <OpenedConnections />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-br");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function VersionDataBase() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let versionDataBase = "Carregando...";
  if (!isLoading && data) {
    versionDataBase = data.dependencies.database.version;
  }

  return <div>Versão do Banco: {versionDataBase}</div>;
}

function MaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let maxConnections = "Carregando...";
  if (!isLoading && data) {
    maxConnections = data.dependencies.database.max_connections;
  }

  return <div>Máximo de conexões permitidas: {maxConnections}</div>;
}

function OpenedConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let openedConnections = "Carregando...";
  if (!isLoading && data) {
    openedConnections = data.dependencies.database.opened_connections;
  }

  return <div>Conexões em uso: {openedConnections}</div>;
}
