import { memo } from "react";

const Header = memo(() => {
  return (
    <header className="text-center">
      <h3 className="mt-3">Mr Q's Poll of the Day</h3>
      <div className="container-md">
        <hr />
      </div>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
