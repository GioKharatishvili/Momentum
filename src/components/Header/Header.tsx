import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES_CONFIG } from "@/config/api-routes";
import { PlusIcon } from "@/assets/icons";
import { Button } from "../Button";
import { CREATE_NEW_EMPLOYEE, CREATE_NEW_TASK } from "./lib";
import logo from "@/assets/images/logo.png";
import { AddEmployeeModal } from "../AddEmployeeModal/AddEmployeeModal";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="py-8 flex items-center justify-between">
        <Link to={ROUTES_CONFIG.HOME.path}>
          <img src={logo} alt="Logo" />
        </Link>

        <div className="flex gap-10">
          <Button
            className="px-5 py-2.5 border border-purple-800 rounded-sm hover:border-purple-400 transition-colors"
            label={CREATE_NEW_EMPLOYEE}
            onClick={() => setIsModalOpen(true)}
          />
          <Link
            to={ROUTES_CONFIG.CREATE_TASK.path}
            className="px-5 py-2.5 flex items-center bg-purple-800 rounded-sm text-white cursor-pointer hover:bg-purple-400 transition-colors">
            <PlusIcon className="pr-1" />
            {CREATE_NEW_TASK}
          </Link>
        </div>
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </header>
    </>
  );
};
