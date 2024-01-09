"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/app/components";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className="  border-b mb-4 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus></AuthStatus>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const Currentpath = usePathname();
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-6">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link
            className={classNames({
              "nav-link": true,
              "text-zinc-900 dark:text-zinc-100": link.href === Currentpath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { data: Sesson, status } = useSession();
  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href={"/api/auth/signin"}>
        Login
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            size={"2"}
            radius="full"
            src={Sesson!.user!.image!}
            fallback="avatar"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"2"}> {Sesson!.user!.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
