import useFetch from "../../hooks/useFetch";
import CompanyList from "../components/CompanyList";
const CompanyPage = () => {
  const {
    data: companies,
    pending,
    error,
  } = useFetch("http://localhost:8000/companies");

  return (
    <div>
      {error && (
        <div style={{ color: "crimson", height: "100vh" }}>
          <h1>{error}</h1>
        </div>
      )}
      {pending && (
        <div style={{ color: "gold", height: "100vh" }}>
          <h1>Loading.........</h1>
        </div>
      )}{" "}
      <br />
      {companies && <CompanyList companies={companies} />}
    </div>
  );
};

export default CompanyPage;
