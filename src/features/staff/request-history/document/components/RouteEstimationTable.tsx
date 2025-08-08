import React from 'react'
import { Table } from '@/components/ui' // or use any Table component you already use
import classNames from 'classnames'

const StatusTag = ({ status }: { status: string }) => (
    <span
        className={classNames(
            'px-2 py-1 text-xs font-semibold rounded',
            status === 'ผ่านได้'
                ? 'text-green-600 bg-green-100'
                : 'text-red-600 bg-red-100'
        )}
    >
        {status}
    </span>
)

const RouteEstimationTable = () => {
    // Mock data
    const summary = [
        { type: 'สะพาน/ท่อลอด', total: 14, pass: 12, fail: 2 },
        { type: 'โครงสร้างทางต่างระดับ', total: 4, pass: 4, fail: 0 },
        { type: 'รัศมีวงเลี้ยว', total: 3, pass: 3, fail: 0 },
        { type: 'อื่นๆ / ทั่วไป', total: 0, pass: 0, fail: 0 },
    ]

    const bridges = [
        { id: 'ชย.3035 กม.3+256', name: 'สะพานมั่นคงพงษ์พิสุทธิ์เจริญ', length: 120, condition: 'พอใช้', status: 'ผ่านไม่ได้' },
        { id: 'ชย.2010 กม.8+198', name: 'สะพานเขตเขตตรง', length: 370.5, condition: 'ดีเยี่ยม', status: 'ผ่านได้' },
    ]

    const structures = [
        { id: 'ชย.3035', type: 'MAST ARM', height: 3, width: 4, status: 'ผ่านได้' },
        { id: 'ชย.2010', type: 'MAST ARM', height: 5, width: 4, status: 'ผ่านไม่ได้' },
    ]

    const curves = [
        { length: 80, radius: 129.15, type: 'very sharp', status: 'ผ่านไม่ได้' },
        { length: 74, radius: 164.30, type: 'very sharp', status: 'ผ่านได้' },
    ]

    return (
        <div className="text-[#0066cc] space-y-8 text-sm">
            <h2 className="font-bold text-base">รายการประเมินเส้นทาง</h2>

            {/* Summary Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border">
                    <thead className="bg-[#0066cc] text-white">
                        <tr>
                            <th className="p-2">ประเภท</th>
                            <th className="p-2 text-center">รวมทั้งหมด</th>
                            <th className="p-2 text-center">ผ่านได้</th>
                            <th className="p-2 text-center">ผ่านไม่ได้</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary.map((row, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-2">{row.type}</td>
                                <td className="p-2 text-center">{row.total}</td>
                                <td className="p-2 text-center">{row.pass}</td>
                                <td className="p-2 text-center">{row.fail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bridges Table */}
            <section>
                <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">สะพาน</h3>
                    <StatusTag status="ผ่านได้ (26)" />
                    <StatusTag status="ผ่านไม่ได้ (15)" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border">
                        <thead className="bg-[#0066cc] text-white">
                            <tr>
                                <th className="p-2">รหัสสะพาน</th>
                                <th className="p-2">ชื่อสะพาน</th>
                                <th className="p-2 text-center">ความยาว</th>
                                <th className="p-2 text-center">สภาพ</th>
                                <th className="p-2 text-center">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bridges.map((b, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{b.id}</td>
                                    <td className="p-2">{b.name}</td>
                                    <td className="p-2 text-center">{b.length}</td>
                                    <td className="p-2 text-center">{b.condition}</td>
                                    <td className="p-2 text-center">
                                        <StatusTag status={b.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Structures Table */}
            <section>
                <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">โครงสร้าง</h3>
                    <StatusTag status="ผ่านได้ (13)" />
                    <StatusTag status="ผ่านไม่ได้ (2)" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border">
                        <thead className="bg-[#0066cc] text-white">
                            <tr>
                                <th className="p-2">รหัสสะพาน</th>
                                <th className="p-2">ประเภทโครงสร้าง</th>
                                <th className="p-2 text-center">ความสูง</th>
                                <th className="p-2 text-center">ความกว้าง</th>
                                <th className="p-2 text-center">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {structures.map((s, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{s.id}</td>
                                    <td className="p-2">{s.type}</td>
                                    <td className="p-2 text-center">{s.height}</td>
                                    <td className="p-2 text-center">{s.width}</td>
                                    <td className="p-2 text-center">
                                        <StatusTag status={s.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Curve Table */}
            <section>
                <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">รัศมีวงเลี้ยว</h3>
                    <StatusTag status="ผ่านได้ (3)" />
                    <StatusTag status="ผ่านไม่ได้ (0)" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border">
                        <thead className="bg-[#0066cc] text-white">
                            <tr>
                                <th className="p-2">curve length</th>
                                <th className="p-2">radius</th>
                                <th className="p-2">curve type</th>
                                <th className="p-2 text-center">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {curves.map((c, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{c.length}</td>
                                    <td className="p-2">{c.radius}</td>
                                    <td className="p-2">{c.type}</td>
                                    <td className="p-2 text-center">
                                        <StatusTag status={c.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default RouteEstimationTable
