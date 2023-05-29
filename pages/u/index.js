import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const index = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUsers(data.users || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {users.map((x, i) => {
        return (
          <div>
            <Link href={`/u/${x.walletAddress}`}>{x.twitterUsername}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default index;
