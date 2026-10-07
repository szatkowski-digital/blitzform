import { Box, Container, Wrench, Check } from "lucide-react";
import { MainCategory, BoxPackageId } from "../types";

export interface CategoryOption {
  id: MainCategory;
  title: string;
  subtitle: string;
}

export interface BoxSubOption {
  id: BoxPackageId;
  name: string;
  price: string;
}

interface CategorySelectorProps {
  mainCategory: MainCategory | null;
  onSelectMainCategory: (cat: MainCategory) => void;
  selectedBoxPackage: BoxPackageId;
  onSelectBoxPackage: (pkg: BoxPackageId) => void;
  step1Label: string;
  step2Label: string;
  categories: CategoryOption[];
  boxSubOptions: BoxSubOption[];
}

// Słownik mapujący ID kategorii na odpowiednią ikonę Lucide
const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  boxes: Box,
  containers: Container,
  consultation: Wrench,
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  mainCategory,
  onSelectMainCategory,
  selectedBoxPackage,
  onSelectBoxPackage,
  step1Label,
  step2Label,
  categories,
  boxSubOptions,
}) => (
  <div className="space-y-6">
    {/* Kategoria Główna */}
    <div>
      <label className="block text-xs font-mono font-semibold uppercase text-zinc-200 tracking-wide mb-3">
        {step1Label}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {categories.map((cat) => {
          const isSelected = mainCategory === cat.id;
          const IconComponent = CATEGORY_ICONS[cat.id] || Box;

          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => onSelectMainCategory(cat.id)}
              className={`p-3.5 rounded-xl text-left transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? "bg-zinc-800 text-white"
                  : "bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-primary/10 text-primary"
                      : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-primary text-zinc-950 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <div
                  className={`font-display text-sm font-bold leading-snug transition-colors ${
                    isSelected ? "text-white" : "text-zinc-200"
                  }`}
                >
                  {cat.title}
                </div>
                <div className="text-sm sm:text-xs font-sans mt-0.5 text-zinc-400">
                  {cat.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>

    {/* Podkategoria Skrzynie / Boxes */}
    {(mainCategory === "boxes" ||
      mainCategory === ("boxes" as MainCategory)) && (
      <div className="rounded-2xl space-y-3">
        <label className="block text-xs font-mono font-semibold uppercase text-zinc-200 tracking-wide">
          {step2Label}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {boxSubOptions.map((pkg) => {
            const isPkgSelected = selectedBoxPackage === pkg.id;
            return (
              <button
                type="button"
                key={pkg.id}
                onClick={() => onSelectBoxPackage(pkg.id)}
                className={`p-3.5 rounded-xl text-left transition-all flex flex-col justify-between gap-3 ${
                  isPkgSelected
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800/80 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-mono font-semibold text-zinc-200">
                    {pkg.price}
                  </span>
                  {isPkgSelected && (
                    <span className="w-4 h-4 rounded-full bg-primary text-zinc-950 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div
                  className={`font-display text-xs sm:text-sm font-bold leading-snug transition-colors ${
                    isPkgSelected ? "text-white" : "text-zinc-200"
                  }`}
                >
                  Pakiet {pkg.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    )}
  </div>
);

export default CategorySelector;
