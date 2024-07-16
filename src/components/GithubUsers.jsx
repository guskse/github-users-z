import { useState, useEffect } from "react";

//github API url
const url = "https://api.github.com/users";

function GithubUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  //function to get the users from the github api
  const getUsers = async () => {
    setError(false);
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="--bg-primary --py2">
      <div className="container">
        <header>
          <h1 className="--text-center --text-light">Github Users</h1>
          <div className="--line"></div>
        </header>

        {loading && (
          <div className="--center-all --p">
            <h4 className="--text-center --text-light">Loading...</h4>
          </div>
        )}

        {!loading && (
          <div className="--grid-25 --py">
            {error ? (
              <h3 className="--text-light --text-center">
                Something went wrong
              </h3>
            ) : (
              users.map((user) => {
                const { id, login, avatar_url, html_url } = user;
                return (
                  <div key={id} className="--card --bg-light --p --flex-start">
                    <img
                      src={avatar_url}
                      alt="image"
                      className="--profile-img --mx"
                    />
                    <span>
                      <h4>{login}</h4>
                      <a href={html_url} target="_blank" rel="noreferrer">
                        View Profile
                      </a>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GithubUsers;
