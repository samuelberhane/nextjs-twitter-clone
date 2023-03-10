const MenuItem = ({ text, Icon }) => {
  return (
    <div className="flex items-center gap-3 p-1 mb-3 text-xl hoverChange rounded-xl">
      <Icon className="hidden text-2xl text-blue-400 sm:inline " />
      <p className="hidden lg:inline ">{text}</p>
    </div>
  );
};

export default MenuItem;
