"use client";
import {
  Text,
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const { data: Sesson, status } = useSession();
  const Currentpath = usePathname();
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="  border-b mb-4 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className={classNames({
                      "text-zinc-900": link.href === Currentpath,
                      "text-zinc-500": link.href !== Currentpath,
                      "hover:text-zinc-900 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              //
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    className="cursor-pointer"
                    size={"2"}
                    radius="full"
                    src={Sesson.user!.image!}
                    fallback="avatar"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size={"2"}> {Sesson.user!.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"}>Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
