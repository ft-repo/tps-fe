import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        reporters: ['verbose', 'json', 'html'],
        outputFile: {
            json: './claude-capture/test-results.json',
            html: './claude-capture/test-report.html',
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './claude-capture/coverage',
            include: [
                'src/utils/**',
                'src/store/slices/**',
                'src/lib/**',
                'src/services/BaseService.ts',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
})
