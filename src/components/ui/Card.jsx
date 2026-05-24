import { motion } from "framer-motion";

export const Card = ({ item, icon, active, onClick }) => {
  const Icon = icon;

  return (
    <motion.div
      layout
      initial={false}
      onClick={onClick}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
      className={`
        relative cursor-pointer rounded-2xl border-2 border-neutral-700 overflow-hidden py-6 md:py-10 px-4 md:px-8 min-h-120
        ${
          active
            ? "bg-n-8/40 backdrop-blur-xl"
            : "bg-neutral-700 hover:bg-neutral-600 hover:border-neutral-600"
        }
      `}
      style={{
        width: active ? "50%" : "25%",
      }}
    >
      <div className="flex flex-col justify-end h-full overflow-hidden">
        {/* Content */}
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className="flex flex-col"
        >
          {active ? (
            <div className="flex flex-col">
              <h2 className="h2 px-4 text-white pb-8 max-md:pb-2">
                {item.title}
              </h2>

              <div className="flex flex-col gap-8 max-md:gap-2">
                <span className="w-full border-b border-n-4/20"></span>

                <p className="body-lg px-4 text-n-4">
                  {item.expanded.description}
                </p>

                <div className="pl-14 xl:pl-24 2xl:pl-40 text-primary flex items-center justify-end text-end gap-2 text-lg max-md:text-xs">
                  <span>{item.expanded.accent}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-col gap-4">
              <h3 className="h3 text-n-1">{item.title}</h3>
              <p className="text-n-4 body-sm">{item.collapsed}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Header */}
      <motion.div
        layout="position"
        className="absolute top-6 left-6 flex gap-2 items-center text-primary"
      >
        <Icon className="w-6 h-6 max-md:w-4 max-md:h-4" />
        <h6 className="h6">{item.name}</h6>
      </motion.div>
    </motion.div>
  );
};

export const MobileCard = ({ item, icon }) => {
  const Icon = icon;

  return (
    <motion.div
      className="
        relative rounded-2xl border-2 border-neutral-700 
        overflow-hidden backdrop-blur-sm 
        py-8 px-6 w-full
      "
    >
      <div className="flex flex-col justify-between h-full overflow-hidden">
        <div className="flex gap-2 items-center pb-10 text-primary">
          <Icon className="w-5 h-5" />
          <h6 className="h6">{item.name}</h6>
        </div>

        <h2 className="h2 text-white pb-4">{item.title}</h2>

        <div className="flex flex-col gap-4">
          <span className="w-full border-b border-n-4/20"></span>

          <p className="body-lg text-n-4">{item.expanded.description}</p>

          <div className="w-full flex items-center justify-end pr-2 text-primary gap-2 text-base">
            <span>{item.expanded.accent}</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
