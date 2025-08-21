import React, { useState } from 'react';
import { 
  useFindPetsByStatus,
  useAddPet,
  useUpdatePet,
  useDeletePet,
  useGetPetById,
  PetStatus,
  type Pet,
  type PetBody
} from '~/generated/api';

export default function PetsOrvalPage() {
  const [selectedStatus, setSelectedStatus] = useState<PetStatus[]>(['available']);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [newPet, setNewPet] = useState<Partial<PetBody>>({
    name: '',
    status: 'available',
    category: { id: 1, name: 'Dogs' },
    tags: [],
    photoUrls: []
  });

  // Orval로 생성된 훅들 사용
  const { 
    data: pets, 
    isLoading: petsLoading, 
    error: petsError ,
    refetch: refetchPets,
  } = useFindPetsByStatus(
    { status: selectedStatus },
    { query: { enabled: selectedStatus.length > 0 } }
  );

  // 특정 펫 조회
  const { 
    data: selectedPet, 
    isLoading: petLoading 
  } = useGetPetById(
    selectedPetId!,
    { query: { enabled: !!selectedPetId } }
  );

  // 펫 생성
  const addPetMutation = useAddPet({
    mutation: {
      onSuccess: () => {
        setNewPet({ name: '', status: 'available', category: { id: 1, name: 'Dogs' }, tags: [], photoUrls: [] });
        refetchPets()
      },
    },
  });

  // 펫 수정
  const updatePetMutation = useUpdatePet({
    mutation: {
      onSuccess: () => {
        setSelectedPetId(null);
      },
    },
  });

  // 펫 삭제
  const deletePetMutation = useDeletePet({
    mutation: {
      onSuccess: () => {
        setSelectedPetId(null);
      },
    },
  });

  const handleCreatePet = () => {
    if (newPet.name) {
      addPetMutation.mutate({ data: newPet as PetBody });
    }
  };

  const handleUpdatePet = (pet: Pet) => {
    updatePetMutation.mutate({ data: pet as PetBody });
  };

  const handleDeletePet = (petId: number) => {
    if (confirm('정말로 이 펫을 삭제하시겠습니까?')) {
      deletePetMutation.mutate({ petId });
    }
  };

  if (petsLoading) return <div className="p-4">펫 목록을 불러오는 중...</div>;
  if (petsError) return <div className="p-4 text-red-500">오류: {petsError}</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Petstore API - Orval 자동생성 훅 사용</h1>
      
      {/* 상태 필터 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">상태별 필터</h2>
        <div className="flex gap-2">
          {(['available', 'pending', 'sold'] as PetStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus([status])}
              className={`px-4 py-2 rounded ${
                selectedStatus.includes(status) 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 펫 생성 폼 */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">새 펫 추가</h2>
        <div className="flex gap-2 items-end">
          <input
            type="text"
            placeholder="펫 이름"
            value={newPet.name}
            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
            className="px-3 py-2 border rounded"
          />
          <select
            value={newPet.status}
            onChange={(e) => setNewPet({ ...newPet, status: e.target.value as PetStatus })}
            className="px-3 py-2 border rounded"
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
          <button
            onClick={handleCreatePet}
            disabled={addPetMutation.isPending || !newPet.name}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {addPetMutation.isPending ? '추가 중...' : '펫 추가'}
          </button>
        </div>
      </div>

      {/* 펫 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets?.map(pet => (
          <div key={pet.id} className="border rounded p-4">
            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <p className="text-gray-600">상태: {pet.status}</p>
            {pet.category && <p className="text-gray-600">카테고리: {pet.category.name}</p>}
            {pet.tags && pet.tags.length > 0 && (
              <div className="mt-2">
                <span className="text-gray-600">태그: </span>
                {pet.tags.map(tag => (
                  <span key={tag.id} className="inline-block bg-gray-200 px-2 py-1 rounded text-sm mr-1">
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setSelectedPetId(pet.id!)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                상세보기
              </button>
              <button
                onClick={() => handleUpdatePet({ ...pet, status: 'sold' })}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                판매완료
              </button>
              <button
                onClick={() => handleDeletePet(pet.id!)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 펫 상세 정보 모달 */}
      {selectedPetId && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{selectedPet.name} 상세 정보</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedPet.id}</p>
              <p><strong>이름:</strong> {selectedPet.name}</p>
              <p><strong>상태:</strong> {selectedPet.status}</p>
              {selectedPet.category && (
                <p><strong>카테고리:</strong> {selectedPet.category.name}</p>
              )}
              {selectedPet.tags && selectedPet.tags.length > 0 && (
                <div>
                  <strong>태그:</strong>
                  <div className="mt-1">
                    {selectedPet.tags.map(tag => (
                      <span key={tag.id} className="inline-block bg-gray-200 px-2 py-1 rounded text-sm mr-1">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSelectedPetId(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 로딩 및 오류 상태 */}
      {addPetMutation.isPending && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
          펫을 추가하는 중...
        </div>
      )}
      
      {updatePetMutation.isPending && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded">
          펫을 수정하는 중...
        </div>
      )}
      
      {deletePetMutation.isPending && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
          펫을 삭제하는 중...
        </div>
      )}

      {/* Orval의 장점 설명 */}
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">🎯 Orval의 장점</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• OpenAPI 스키마에서 완벽한 TypeScript 타입 자동 생성</li>
          <li>• React Query 훅 자동 생성 (useQuery, useMutation, useInfiniteQuery)</li>
          <li>• 쿼리 키 자동 관리 및 캐시 무효화</li>
          <li>• 에러 처리 및 로딩 상태 자동 관리</li>
          <li>• 스키마 변경 시 자동으로 코드 업데이트</li>
        </ul>
      </div>
    </div>
  );
}
