type Block= {
    type: string,
    settings: Setting[]
};

type Setting = {
    type: "modal" | "dual" | "check" | "button",
    title: string,
    options?: string[]
};


export const blocks: Block[] = [
    {
        type: "System settings",
        settings: [
            {type: "modal", title: "Language", options: ["English"]},
            {type: "dual", title: "Theme", options: ["Dark", "Light"]},
            {type: "check", title: "Enable Notifications"}]
    },
    {
        type: "Calendar settings",
        settings: [
            {type: "dual", title: "Time Format", options: ["12", "24"]},
            {type: "modal", title: "Start Of The Week", options: ["Monday", "Sunday", "Saturday"]}]
    },
    {
        type: "Clear settings",
        settings: [
            {type: "button", title: "Reset All Settings"},
            {type: "button", title: "Clear database"}]
    }
]