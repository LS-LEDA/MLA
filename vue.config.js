module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: "MLA",
                appId: "org.gretel.mla",
                directories: {
                    "output": "build"
                },
                publish: ["github"],
                win: {
                    icon: "resources/installer/icon.png",
                    target: [
                        "zip",
                        "nsis",
                        "portable"
                    ],
                },
                nsis: {
                    oneClick: false,
                    perMachine: true,
                    allowElevation: true,
                    allowToChangeInstallationDirectory: true,
                    installerIcon: "resources/installer/icon.ico"
                },
                mac: {
                    category: "public.app-category.education",
                    icon: "resources/installer/icon.png",
                    target: [
                        "zip",
                        "dmg"
                    ]
                },
                dmg: {
                    icon: "resources/installer/icon.png"
                }
            }
        }
    }
}