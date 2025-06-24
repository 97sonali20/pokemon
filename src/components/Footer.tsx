import { config } from '@/lib/config'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <span className="text-xl font-bold text-white">{config.app.name}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-6">
                            Discover and explore the wonderful world of Pokemon with comprehensive information,
                            detailed stats, and beautiful modern design. Your ultimate Pokédex companion.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs font-medium text-green-400">Live Data</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Navigation</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full group-hover:bg-white transition-colors"></span>
                                    All Pokemon
                                </Link>
                            </li>
                            <li>
                                <Link href="/favorites" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-red-500 rounded-full group-hover:bg-white transition-colors"></span>
                                    My Favorites
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="https://pokeapi.co/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:bg-white transition-colors"></span>
                                    PokéAPI
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.pokemon.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-yellow-500 rounded-full group-hover:bg-white transition-colors"></span>
                                    Official Pokemon
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>© 2024 {config.app.name}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">Built with Next.js & TypeScript</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>Data provided by PokéAPI</span>
                            <span>•</span>
                            <span>Made with for Pokemon fans</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer