import { CheckIcon } from "@recordair/ui-core/icons";

type Step = {
  id: string;
  label: string;
  eyebrow?: string;
};

type StepperProps = {
  steps: readonly Step[];
  currentStep: number;
  ariaLabel: string;
  completedStepLabel: string;
};

const Stepper = ({
  steps,
  currentStep,
  ariaLabel,
  completedStepLabel,
}: StepperProps) => (
  <ol className="flex items-center" aria-label={ariaLabel}>
    {steps.map((step, index) => {
      const number = index + 1;
      const done = number < currentStep;
      const active = number === currentStep;

      return (
        <li
          key={step.id}
          className="flex items-center"
          style={{ flex: index < steps.length - 1 ? 1 : "0 0 auto" }}
          aria-current={active ? "step" : undefined}
        >
          <div className="flex items-center gap-0 sm:gap-3">
            <span
              className={[
                "grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold",
                done
                  ? "bg-success text-neutral-0"
                  : active
                    ? "bg-brand-primary text-neutral-0"
                    : "bg-neutral-100 text-neutral-500",
              ].join(" ")}
            >
              {done ? (
                <CheckIcon aria-label={completedStepLabel} className="size-4" />
              ) : (
                number
              )}
            </span>
            <span className="hidden flex-col sm:flex">
              {step.eyebrow ? (
                <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  {step.eyebrow}
                </span>
              ) : null}
              <span
                className={`text-sm font-semibold ${active ? "text-neutral-900" : "text-neutral-500"}`}
              >
                {step.label}
              </span>
            </span>
          </div>
          {index < steps.length - 1 ? (
            <span
              aria-hidden
              className={`mx-4 h-0.5 flex-1 rounded-full ${done ? "bg-success" : "bg-neutral-200"}`}
            />
          ) : null}
        </li>
      );
    })}
  </ol>
);

Stepper.displayName = "Stepper";

export { Stepper };
export type { Step, StepperProps };
