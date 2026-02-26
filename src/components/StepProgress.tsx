interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
    return (
        <div className="flex justify-center gap-2 mt-4 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                    key={i}
                    className="h-1 w-10 rounded-full transition-colors duration-300"
                    style={{
                        backgroundColor: i < currentStep ? 'var(--primary)' : '#e2e8f0',
                    }}
                />
            ))}
        </div>
    );
};

export default StepProgress;
