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
                },
                linux: {
                    executableName: "MLA",
                    artifactName: "${productName}-${version}-linux-${arch}.${ext}",
                    maintainer: "Jiahui Chen",
                    synopsis: "MLA Is a desktop app for learning analytics",
                    description: "Moodle Learning analytics is a desktop app that analyses Moodle generated logs and provides insightful information",
                    category: "Education",
                    desktop: {
                        Terminal: "false",
                        Type: "Application",
                        Categories: "GTK;GNOME;Education;"
                    },
                    target: [
                        {
                            target: "zip",
                            arch: [
                                "x64"
                            ]
                        },
                        {
                            target: "AppImage",
                            arch: [
                                "x64"
                            ]
                        },
                        {
                            target: "deb",
                            arch: [
                                "x64"
                            ]
                        },
                        {
                            target: "snap",
                            arch: [
                                "x64"
                            ]
                        },
                        {
                            target: "pacman",
                            arch: [
                                "x64"
                            ]
                        },
                        {
                            target: "freebsd",
                            arch: [
                                "x64"
                            ]
                        },
                        {
                            target: "rpm",
                            arch: [
                                "x64"
                            ]
                        }
                    ]
                },
            }
        }
    }
}