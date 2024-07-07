import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import React from "react";

type Props = {};

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

const Profile = async (props: Props) => {
  const user = await getUser();
  const handleLogout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome! {user?.username} ❤️</h1>
      <form action={handleLogout}>
        <button>LogOut</button>
      </form>
    </div>
  );
};

export default Profile;
